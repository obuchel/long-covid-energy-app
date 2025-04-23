import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './EnergyDashboard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function EnergyDashboard() {
  // State for user's energy data
  const [energyData, setEnergyData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Energy Level',
        data: [70, 65, 75, 60, 80, 75, 65],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Activity Level',
        data: [60, 75, 70, 80, 65, 85, 60],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
      },
    ],
  });

  // State for recommendations
  const [recommendations, setRecommendations] = useState({
    energyBudget: 75,
    dietRecommendations: [
      'Increase anti-inflammatory foods',
      'Focus on protein with each meal',
      'Stay hydrated (aim for 2.5L daily)',
    ],
    exerciseRecommendations: [
      'Light walking for 10-15 minutes',
      'Gentle stretching in the morning',
      'Keep heart rate below 110 BPM',
    ],
  });

  // State for symptom input
  const [symptomInput, setSymptomInput] = useState({
    fatigue: 3,
    pain: 2,
    cognitiveIssues: 4,
    sleepQuality: 3,
  });

  // Mock function to update recommendations based on new symptoms
  const updateRecommendations = (symptoms) => {
    // This would be replaced with your actual control loop algorithm
    const newEnergyBudget = 
      100 - (symptoms.fatigue * 5) - 
      (symptoms.pain * 3) - 
      (symptoms.cognitiveIssues * 4) + 
      (symptoms.sleepQuality * 3);
    
    setRecommendations({
      ...recommendations,
      energyBudget: Math.max(30, Math.min(100, newEnergyBudget)),
    });
  };

  // Handle symptom slider changes
  const handleSymptomChange = (symptom, value) => {
    const newSymptoms = { ...symptomInput, [symptom]: parseInt(value) };
    setSymptomInput(newSymptoms);
    updateRecommendations(newSymptoms);
  };

  // Prepare the chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Energy & Activity Trends',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Level (%)'
        }
      }
    }
  };

  return (
    <div className="container">
      <h1 className="dashboard-title">Long COVID Energy Management</h1>
      
      {/* Energy Status Section */}
      <div className="status-panel">
        <h2 className="panel-title">Current Energy Status</h2>
        <div className="energy-display">
          <div className="energy-value">
            <div className="energy-number">
              {recommendations.energyBudget}%
            </div>
            <div className="energy-label">Available Energy</div>
          </div>
          
          <div className="chart-container">
            <Line options={chartOptions} data={energyData} height={80} />
          </div>
        </div>
      </div>
      
      {/* Symptom Input Section */}
      <div className="input-panel">
        <h2 className="panel-title">Update Your Symptoms</h2>
        <div className="input-grid">
          <div>
            <label className="input-label">
              Fatigue Level (1-5)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={symptomInput.fatigue}
              onChange={(e) => handleSymptomChange('fatigue', e.target.value)}
              className="slider-container"
            />
            <div className="slider-labels">
              <span>Mild</span>
              <span>Severe</span>
            </div>
          </div>
          
          <div>
            <label className="input-label">
              Pain Level (1-5)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={symptomInput.pain}
              onChange={(e) => handleSymptomChange('pain', e.target.value)}
              className="slider-container"
            />
            <div className="slider-labels">
              <span>None</span>
              <span>Severe</span>
            </div>
          </div>
          
          <div>
            <label className="input-label">
              Cognitive Issues (1-5)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={symptomInput.cognitiveIssues}
              onChange={(e) => handleSymptomChange('cognitiveIssues', e.target.value)}
              className="slider-container"
            />
            <div className="slider-labels">
              <span>Clear</span>
              <span>Foggy</span>
            </div>
          </div>
          
          <div>
            <label className="input-label">
              Sleep Quality (1-5)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={symptomInput.sleepQuality}
              onChange={(e) => handleSymptomChange('sleepQuality', e.target.value)}
              className="slider-container"
            />
            <div className="slider-labels">
              <span>Poor</span>
              <span>Great</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recommendations Section */}
      <div className="recommendations-grid">
        <div className="diet-panel">
          <h2 className="panel-title">Diet Recommendations</h2>
          <ul className="recommendation-list">
            {recommendations.dietRecommendations.map((rec, idx) => (
              <li key={idx} className="recommendation-item">
                <span className="bullet green-bullet">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="exercise-panel">
          <h2 className="panel-title">Exercise Recommendations</h2>
          <ul className="recommendation-list">
            {recommendations.exerciseRecommendations.map((rec, idx) => (
              <li key={idx} className="recommendation-item">
                <span className="bullet purple-bullet">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EnergyDashboard;
