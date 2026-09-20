import { 
  SensorData, 
  ContactHealth, 
  SystemStatus, 
  Event, 
  EventType, 
  EventSeverity, 
  ContactState, 
  SafetyState 
} from '@/types/arcwise';

export type DemoScenario = 'NORMAL' | 'EARLY_DEGRADATION' | 'UNSTABLE' | 'PRE_ARC' | 'CRITICAL';

export class ArcwiseEngine {
  // State
  private sensor: SensorData;
  private health: ContactHealth;
  private system: SystemStatus;
  
  private currentScenario: DemoScenario = 'NORMAL';
  private baselineTemp = 42.0;
  private baselineCurrent = 0.85;
  private tickCount = 0;

  // Configuration thresholds
  private config = {
    tempWarning: 45.0,
    tempCritical: 55.0,
    currentWarning: 1.1,
    acousticWarning: 40,
    acousticCritical: 80,
  };

  private callbacks: ((
    sensor: SensorData, 
    health: ContactHealth, 
    system: SystemStatus, 
    newEvent: Event | null
  ) => void)[] = [];

  constructor() {
    this.sensor = {
      timestamp: Date.now(),
      temperature: 42.6,
      current: 0.82,
      acousticLevel: 5,
      acousticState: 'NORMAL'
    };

    this.health = {
      chi: 95,
      tri: 90,
      state: 'NORMAL',
      degradation: 0,
      lastUpdated: Date.now()
    };

    this.system = {
      safetyState: 'SAFE',
      loadStatus: 'CONNECTED',
      ssrStatus: 'ON',
      deviceStatus: 'ONLINE',
      communicationStatus: 'ONLINE',
      operatingMode: 'SIMULATION',
      latestAction: 'System Monitoring Active'
    };
  }

  public subscribe(callback: (s: SensorData, h: ContactHealth, sys: SystemStatus, e: Event | null) => void) {
    this.callbacks.push(callback);
    callback(this.sensor, this.health, this.system, null);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  public setScenario(scenario: DemoScenario) {
    this.currentScenario = scenario;
    let eventType: EventType = 'SYSTEM_INITIALIZED';
    let severity: EventSeverity = 'INFO';
    let action = 'Scenario updated';

    switch (scenario) {
      case 'NORMAL':
        this.reset();
        return; // reset handles its own event
      case 'EARLY_DEGRADATION':
        eventType = 'EARLY_DEGRADATION';
        severity = 'LOW';
        action = 'Monitoring intensified';
        break;
      case 'UNSTABLE':
        eventType = 'UNSTABLE_CONTACT';
        severity = 'MEDIUM';
        action = 'Maintenance recommended';
        break;
      case 'PRE_ARC':
        eventType = 'PRE_ARC_RISK';
        severity = 'HIGH';
        action = 'High Risk Warning Issued';
        break;
      case 'CRITICAL':
        eventType = 'CRITICAL_CONTACT';
        severity = 'CRITICAL';
        action = 'Initiating Load Isolation';
        break;
    }

    const event = this.createEvent(eventType, severity, `Scenario changed to ${scenario}`, action);
    this.notify(event);
  }

  public reset() {
    this.currentScenario = 'NORMAL';
    this.sensor.temperature = this.baselineTemp;
    this.sensor.current = this.baselineCurrent;
    this.sensor.acousticLevel = 5;
    this.sensor.acousticState = 'NORMAL';
    
    this.health.chi = 98;
    this.health.tri = 95;
    this.health.state = 'NORMAL';
    this.health.degradation = 0;

    this.system.loadStatus = 'CONNECTED';
    this.system.ssrStatus = 'ON';
    this.system.safetyState = 'SAFE';
    this.system.latestAction = 'System Reset & Recovered';

    const event = this.createEvent('SYSTEM_RECOVERED', 'INFO', 'System reset to normal operating conditions', 'Monitoring Resumed');
    this.notify(event);
  }

  public tick() {
    this.tickCount++;
    this.simulateSensors();
    const event = this.evaluateDecisionEngine();
    this.notify(event);
  }

  private simulateSensors() {
    // Add natural noise
    const noiseT = (Math.random() - 0.5) * 0.4;
    const noiseC = (Math.random() - 0.5) * 0.08;
    const noiseA = (Math.random() * 5); // 0-5% base acoustic noise

    switch (this.currentScenario) {
      case 'NORMAL':
        this.sensor.temperature = this.baselineTemp + noiseT;
        this.sensor.current = this.baselineCurrent + noiseC;
        this.sensor.acousticLevel = noiseA;
        this.sensor.acousticState = 'NORMAL';
        
        // Recover gradually
        if (this.health.chi < 95) this.health.chi += 0.5;
        if (this.health.tri < 90) this.health.tri += 0.5;
        break;

      case 'EARLY_DEGRADATION':
        this.sensor.temperature = this.baselineTemp + 2 + noiseT;
        this.sensor.current = this.baselineCurrent + 0.1 + noiseC;
        this.sensor.acousticLevel = noiseA + 10; // 10-15%
        this.sensor.acousticState = 'LOW_EVENT';
        
        this.health.degradation += 0.1;
        break;

      case 'UNSTABLE':
        this.sensor.temperature = this.baselineTemp + 5 + (noiseT * 2);
        this.sensor.current = this.baselineCurrent + 0.2 + (noiseC * 3);
        this.sensor.acousticLevel = noiseA + 30 + (Math.random() > 0.8 ? 20 : 0); // spikes
        this.sensor.acousticState = 'ELEVATED';
        
        this.health.degradation += 0.5;
        break;

      case 'PRE_ARC':
        this.sensor.temperature = this.baselineTemp + 10 + (noiseT * 3);
        this.sensor.current = this.baselineCurrent + 0.5 + (noiseC * 5);
        this.sensor.acousticLevel = noiseA + 60 + (Math.random() > 0.5 ? 30 : 0);
        this.sensor.acousticState = 'HIGH';
        
        this.health.degradation += 1.5;
        break;

      case 'CRITICAL':
        // If isolated, values drop
        if (this.system.loadStatus === 'ISOLATED') {
          this.sensor.temperature = Math.max(25, this.sensor.temperature - 2);
          this.sensor.current = 0;
          this.sensor.acousticLevel = 0;
          this.sensor.acousticState = 'NORMAL';
        } else {
          this.sensor.temperature += 2; // Rapid heating
          this.sensor.current += 1.0;
          this.sensor.acousticLevel = 95;
          this.sensor.acousticState = 'CONTINUOUS_ARC';
          this.health.degradation += 5.0;
        }
        break;
    }

    // Clamp values
    this.sensor.timestamp = Date.now();
    this.sensor.temperature = Number(this.sensor.temperature.toFixed(1));
    this.sensor.current = Number(Math.max(0, this.sensor.current).toFixed(2));
    this.sensor.acousticLevel = Number(Math.min(100, Math.max(0, this.sensor.acousticLevel)).toFixed(0));
    this.health.degradation = Math.min(100, this.health.degradation);
  }

  private evaluateDecisionEngine(): Event | null {
    let generatedEvent: Event | null = null;

    // Temporal Electro-Acoustic Analysis & TRI deterioration
    if (this.sensor.acousticLevel > this.config.acousticCritical || this.sensor.temperature > this.config.tempCritical) {
       this.health.tri = Math.max(10, this.health.tri - 2.5);
    } else if (this.sensor.acousticLevel > this.config.acousticWarning || this.sensor.temperature > this.config.tempWarning) {
       this.health.tri = Math.max(30, this.health.tri - 1.0);
    }

    // CHI Calculation (100 is perfect)
    // Formula: Base 100 - (Degradation) - (TRI deficit) - (Acoustic Penalty)
    const triDeficit = (100 - this.health.tri) * 0.3;
    const acousticPenalty = (this.sensor.acousticLevel / 100) * 20;
    
    this.health.chi = Math.max(0, 100 - this.health.degradation - triDeficit - acousticPenalty);
    this.health.chi = Number(this.health.chi.toFixed(0));
    this.health.tri = Number(this.health.tri.toFixed(0));
    this.health.lastUpdated = Date.now();

    // State Classification
    let newState: ContactState = 'NORMAL';
    let newSafety: SafetyState = 'SAFE';

    if (this.system.loadStatus === 'ISOLATED') {
      newState = 'ISOLATED';
      newSafety = 'CRITICAL';
    } else if (this.health.chi < 30 || this.sensor.temperature > this.config.tempCritical) {
      newState = 'CRITICAL';
      newSafety = 'CRITICAL';
    } else if (this.health.chi < 50) {
      newState = 'PRE_ARC_RISK';
      newSafety = 'HIGH_RISK';
    } else if (this.health.chi < 65) {
      newState = 'UNSTABLE_CONTACT';
      newSafety = 'WARNING';
    } else if (this.health.chi < 80) {
      newState = 'EARLY_DEGRADATION';
      newSafety = 'MONITOR';
    }

    // Check for State Transitions
    if (newState !== this.health.state) {
      this.health.state = newState;
      this.system.safetyState = newSafety;
      
      if (newState === 'CRITICAL' && this.system.loadStatus !== 'ISOLATED') {
        // Intervene
        this.system.loadStatus = 'ISOLATED';
        this.system.ssrStatus = 'OFF';
        this.system.latestAction = 'LOAD ISOLATED (SIMULATED)';
        
        generatedEvent = this.createEvent(
          'LOAD_ISOLATED', 
          'CRITICAL', 
          'Critical conditions met. Simulated SSR disconnected load.', 
          'LOAD ISOLATED'
        );
      } else if (newState === 'PRE_ARC_RISK') {
        this.system.latestAction = 'WARNING ISSUED';
        generatedEvent = this.createEvent(
          'PRE_ARC_RISK', 
          'HIGH', 
          'High acoustic activity and thermal abnormalities detected. Pre-arc risk imminent.', 
          'WARNING ISSUED'
        );
      } else if (newState === 'UNSTABLE_CONTACT') {
        this.system.latestAction = 'MAINTENANCE RECOMMENDED';
      }
    }

    // Minor event generation for spikes (debounced via tickCount)
    if (!generatedEvent && this.tickCount % 5 === 0) {
      if (this.sensor.acousticLevel > this.config.acousticWarning && this.health.state !== 'CRITICAL' && this.health.state !== 'ISOLATED') {
         generatedEvent = this.createEvent('ACOUSTIC_DISTURBANCE', 'MEDIUM', 'Elevated acoustic noise detected.', 'Logged');
      }
    }

    return generatedEvent;
  }

  private createEvent(type: EventType, severity: EventSeverity, description: string, actionTaken: string): Event {
    return {
      id: `evt-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      timestamp: Date.now(),
      type,
      severity,
      description,
      actionTaken,
      contactState: this.health.state,
      temperature: this.sensor.temperature,
      current: this.sensor.current,
      acousticLevel: this.sensor.acousticLevel,
      chi: this.health.chi,
      tri: this.health.tri,
      loadStatus: this.system.loadStatus
    };
  }

  private notify(event: Event | null) {
    this.callbacks.forEach(cb => cb({...this.sensor}, {...this.health}, {...this.system}, event));
  }
}
