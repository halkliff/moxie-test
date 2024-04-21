import type { AppointmentStatus } from '../types/appointment-status.enum.js';
import type { CreateAppointmentDTO } from './create-appointment.dto.js';

export interface UpdateAppointmentDTO
  extends Pick<CreateAppointmentDTO, 'start'> {
  status?: AppointmentStatus;
}
