import os
import sys
import subprocess

def start_fastapi(port):  
    subprocess.Popen(['uvicorn', 'backend.main.src:app', '--host', '127.0.0.1', '--port', str(port)])

def start_next():
    subprocess.Popen(['npm', 'run', 'dev'], cwd='frontend/front')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python start_servers.py 500")
        sys.exit(1)

    port_fastapi = 500
    start_fastapi(port_fastapi)
    start_next()
