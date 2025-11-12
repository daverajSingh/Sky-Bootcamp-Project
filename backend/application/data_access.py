from dotenv import load_dotenv
import pymysql
import os

load_dotenv() # Load environment variables from .env file - UNTRACKED FOR SECURITY

class DataAccess:
    def __init__(self):
        self.__connection = None
        self.__cursor = None
        self._create_db_if_not_exists()
        self._connect()

    def _connect(self):
        """Connects to the database, and sets DAO cursor"""
        if not self.__connection or not self.__connection.open:
            try:
                self.__connection = pymysql.connect(
                    host=os.getenv("DB_HOST"),
                    user=os.getenv("DB_USER"),
                    db=os.getenv("DB_NAME"),
                    port=int(os.getenv("DB_PORT"), 3306),
                    cursorclass=pymysql.cursors.DictCursor,
                )
                self.__cursor = self.__connection.cursor()
            except pymysql.MySQLError as e:
                raise RuntimeError(f'Database connection error: {e}')

    def _create_db_if_not_exists(self):
        """Connect without selecting a DB and ensure the target database exists."""
        try:
            connection = pymysql.connect(
                host=os.getenv("DB_HOST"),
                user=os.getenv("DB_USER"),
                cursorclass=pymysql.cursors.DictCursor
            )
            with connection.cursor() as cursor:
                db_name = os.getenv("DB_NAME")
                cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{db_name}`;")
            connection.close()
        except pymysql.MySQLError as e:
            raise RuntimeError(f"Error ensuring database exists: {e}")

    def __del__(self):
        """Garbage Collection - closes connection"""
        self.close()

    def close(self):
        """Closes cursor and connection"""
        if self.__cursor:
            try:
                self.__cursor.close()
            except pymysql.MySQLError:
                pass

        if self.__connection:
            try:
                self.__connection.close()
            except pymysql.MySQLError:
                pass

    def query(self, query, params=None):
        """Used to query the database - GET"""
        try:
            self._connect()
            self.__cursor.execute(query, params)
            return self.__cursor.fetchall()
        except pymysql.MySQLError as e:
            raise RuntimeError(f'Database query error: {e}')

    def execute(self, query, params=None):
        """Used to add to the database - POST/PATCH/UPDATE"""
        try:
            self._connect()
            self.__cursor.execute(query, params)
            self.__connection.commit()
            return self.__cursor.lastrowid
        except pymysql.MySQLError as e:
            self.__connection.rollback()
            raise RuntimeError(f"Database query execution failed: {e}")
    
    def execute_file(self, file_path):
        """Executes SQL commands from a file."""
        try:
            with open(file_path, 'r') as file:
                sql_commands = file.read()
            self._connect()
            for command in sql_commands.split(';'):
                command = command.strip()
                if command:
                    self.__cursor.execute(command)
            self.__connection.commit()
        except (pymysql.MySQLError, IOError) as e:
            self.__connection.rollback()
            raise RuntimeError(f"Failed to execute SQL file: {e}")

    def execute_stored_procedures(self, file_path):
        """Executes SQL file containing stored procedures."""
        try:
            with open(file_path, 'r') as file:
                sql_content = file.read()
            self._connect()
            lines = sql_content.split('\n')
            cleaned_lines = [
                line for line in lines 
                if not line.strip().upper().startswith('DELIMITER')
            ]
            sql_content = '\n'.join(cleaned_lines)
            procedures = sql_content.split('//')
            for proc in procedures:
                proc = proc.strip().rstrip(';').strip()
                if proc and not proc.isspace():
                    self.__cursor.execute(proc)
            self.__connection.commit()
        except (pymysql.MySQLError, IOError) as e:
            self.__connection.rollback()
            raise RuntimeError(f"Failed to execute stored procedures file: {e}")