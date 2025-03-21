import subprocess
from config.config import python_dir

def run_transaction_service():
    subprocess.Popen([python_dir, "transaction_app\\app.py"])



if __name__ == '__main__':
    try:
        run_transaction_service()
        while True:
            pass
    except KeyboardInterrupt:
        print("\nTerminating both the processes. Alvida!")
