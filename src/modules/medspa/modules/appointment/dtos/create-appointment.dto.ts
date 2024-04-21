export interface CreateAppointmentDTO {
  start: Date;
  services: {
    serviceId: number;
  }[];
}
