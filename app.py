from flask import Flask, render_template, request, redirect
import sqlite3
from datetime import datetime

from flask import Flask
app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS fitness (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            steps INTEGER,
            workout TEXT,
            minutes INTEGER,
            calories INTEGER
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add():
    date = datetime.now().strftime("%Y-%m-%d")
    steps = request.form['steps']
    workout = request.form['workout']
    minutes = request.form['minutes']
    calories = request.form['calories']

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("INSERT INTO fitness (date, steps, workout, minutes, calories) VALUES (?, ?, ?, ?, ?)",
              (date, steps, workout, minutes, calories))
    conn.commit()
    conn.close()

    return redirect('/dashboard')

@app.route('/dashboard')
def dashboard():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("SELECT * FROM fitness")
    data = c.fetchall()
    conn.close()
    return render_template('dashboard.html', data=data)

app.run(host='0.0.0.0', port=5000, debug=True)