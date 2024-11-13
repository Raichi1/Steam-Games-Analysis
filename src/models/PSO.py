# Clase de Partícula
import numpy as np

from concurrent.futures import ProcessPoolExecutor

class Particle:
    def __init__(self, bounds, dim):
        self.position = np.random.uniform(bounds[0][0], bounds[0][1], dim)
        self.velocity = np.random.uniform(-1, 1, dim)
        self.best_position = self.position.copy()
        self.best_score = float('inf')
    
    def update_velocity(self, global_best_position, w=0.5, c1=1, c2=2):
        r1, r2 = np.random.rand(2)
        cognitive = c1 * r1 * (self.best_position - self.position)
        social = c2 * r2 * (global_best_position - self.position)
        self.velocity = w * self.velocity + cognitive + social
    
    def update_position(self, bounds):
        self.position += self.velocity

        # Asegurar que la posición esté dentro de los límites
        for i in range(len(bounds)):
            self.position[i] = np.clip(self.position[i], bounds[i][0], bounds[i][1])


def particle_swarm_optimization(func, bounds, dim, n_particles=30, iterations=10):
    swarm = [Particle(bounds, dim) for _ in range(n_particles)]
    global_best_position = np.random.uniform(bounds[0][0], bounds[0][1], dim)
    global_best_score = float('inf')
    
    for i in range(iterations):
        # Evaluar en paralelo con un límite de 4 procesos
        with ProcessPoolExecutor(max_workers=4) as executor:
            scores = list(executor.map(func, [particle.position for particle in swarm]))
        
        # Actualizar la mejor posición y puntuación de cada partícula
        for idx, particle in enumerate(swarm):
            score = scores[idx]
            if score < particle.best_score:
                particle.best_score = score
                particle.best_position = particle.position.copy()
            if score < global_best_score:
                global_best_score = score
                global_best_position = particle.position.copy()
        
        # Actualizar la velocidad y posición de las partículas
        for particle in swarm:
            particle.update_velocity(global_best_position)
            particle.update_position(bounds)
        
        print(f"Iteración {i+1}/{iterations}, Mejor precisión: {-global_best_score}")
    
    return global_best_position, -global_best_score
