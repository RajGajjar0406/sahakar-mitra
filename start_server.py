"""
SIH 2026 - Multilingual Cooperative Governance & Legal Assistance Chatbot
One-Click Local Server Launcher with No-Cache Headers
Ensures browser always loads the latest HTML/CSS/JS without caching stale files.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom request handler that disables browser caching during development."""
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

def find_available_port(start_port):
    port = start_port
    while port < start_port + 100:
        try:
            with socketserver.TCPServer(("", port), None) as s:
                return port
        except OSError:
            port += 1
    return start_port

def run():
    # Configure UTF-8 encoding for console output if possible
    try:
        if hasattr(sys.stdout, "reconfigure"):
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

    # Change working directory to the directory containing this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    port = find_available_port(PORT)
    handler = NoCacheHTTPRequestHandler

    print("=" * 70)
    print(" [NyayaMitra AI] SIH 2026: Multilingual Legal Assistant")
    print("=" * 70)
    print(f" [*] Server started at: http://localhost:{port}/")
    print(" [*] Cache-Busting: ENABLED (always serves fresh code)")
    print(" [*] Zero API Dependencies: 100% Local & Free")
    print(" [*] Web browser opening automatically...")
    print(" [*] Keep this terminal open while testing. Press Ctrl+C to stop.")
    print("=" * 70)

    # Open web browser
    try:
        webbrowser.open(f"http://localhost:{port}/")
    except Exception:
        pass

    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[*] Server stopped gracefully. Good luck with SIH 2026!")
        sys.exit(0)

if __name__ == "__main__":
    run()
