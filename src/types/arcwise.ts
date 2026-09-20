export type ContactState =
  | 'NORMAL'
  | 'EARLY_DEGRADATION'
  | 'UNSTABLE_CONTACT'
  | 'PRE_ARC_RISK'
  | 'CRITICAL'
  | 'ISOLATED';

export type LoadStatus = 'CONNECTED' | 'DISCONNECTED' | 'ISOLATED';
export type DeviceStatus = 'ONLINE' | 'OFFLINE' | 'ERROR' | 'MAINTENANCE';
export type SSRStatus = 'ON' | 'OFF' | 'FAULT';
export type OperatingMode = 'NORMAL' | 'SIMULATION' | 'DEMO';
export type AcousticState = 'NORMAL' | 'LOW_EVENT' | 'ELEVATED' | 'HIGH' | 'CONTINUOUS_ARC';
export type SafetyState = 'SAFE' | 'MONITOR' | 'WARNING' | 'HIGH_RISK' | 'CRITICAL';

export interface SensorData {
  timestamp: number;
  temperature: number; // in Celsius
  current: number; // in Amperes
  acousticLevel: number; // in % (0-100)
  acousticState: AcousticState;
}

export interface ContactHealth {
  chi: number; // Contact Health Index (0-100%)
  tri: number; // Thermal Recovery Index (0-100%)
  state: ContactState;
  degradation: number; // Accumulated degradation score (0-100)
  lastUpdated: number;
}

export interface SystemStatus {
  safetyState: SafetyState;
  loadStatus: LoadStatus;
  ssrStatus: SSRStatus;
  deviceStatus: DeviceStatus;
  communicationStatus: DeviceStatus;
  operatingMode: OperatingMode;
  latestAction: string;
}

export type EventSeverity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type EventType =
  | 'SYSTEM_INITIALIZED'
  | 'SENSOR_ANOMALY'
  | 'THERMAL_ANOMALY'
  | 'ACOUSTIC_DISTURBANCE'
  | 'CURRENT_TRANSIENT'
  | 'EARLY_DEGRADATION'
  | 'UNSTABLE_CONTACT'
  | 'PRE_ARC_RISK'
  | 'CRITICAL_CONTACT'
  | 'LOAD_ISOLATED'
  | 'SYSTEM_RECOVERED'
  | 'MAINTENANCE_REQUIRED';

export interface Event {
  id: string;
  timestamp: number;
  type: EventType;
  severity: EventSeverity;
  contactState: ContactState;
  temperature: number;
  current: number;
  acousticLevel: number;
  tri: number;
  chi: number;
  description: string;
  actionTaken: string;
  loadStatus: LoadStatus;
}

