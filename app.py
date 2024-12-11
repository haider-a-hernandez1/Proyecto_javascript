from flask import Flask, request, jsonify, render_template
import pandas as pd
import matplotlib.pyplot as plt
import os

app = Flask(__name__)

# Cargar el archivo CSV
CSV_FILE = "notas_alumnos.csv"
df = pd.read_csv(CSV_FILE)

# Ruta principal para renderizar el HTML
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para obtener estadísticas y promedios
@app.route('/api/estadisticas', methods=['GET'])
def obtener_estadisticas():
    # Calcular promedio total de cada alumno
    df['Promedio'] = df[['Nota1', 'Nota2', 'Nota3']].mean(axis=1)
    
    # Calcular promedio general del curso
    promedio_general = df['Promedio'].mean()
    
    # Filtrar alumnos aprobados (Promedio >= 7)
    aprobados = df[df['Promedio'] >= 7]
    reprobados = df[df['Promedio'] < 7]

    # Crear un gráfico de barras
    plt.figure(figsize=(10, 6))
    plt.bar(df['Nombre'], df['Promedio'], color=['green' if p >= 7 else 'red' for p in df['Promedio']])
    plt.xticks(rotation=90)
    plt.title('Promedio de Notas por Alumno')
    plt.xlabel('Alumnos')
    plt.ylabel('Promedio')
    plt.tight_layout()
    grafico_path = "static/grafico_notas.png"
    plt.savefig(grafico_path)
    plt.close()
    
    # Respuesta JSON
    return jsonify({
        "promedio_general": round(promedio_general, 2),
        "total_aprobados": len(aprobados),
        "total_reprobados": len(reprobados),
        "grafico_path": grafico_path
    })

if __name__ == '__main__':
    # Crear directorio static si no existe
    if not os.path.exists("static"):
        os.makedirs("static")
    app.run(debug=True)
