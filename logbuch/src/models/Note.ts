export type Note = {
  // Unique identifier, e.g., UUID or filename-based hash.
  id: string;
  text: string;
  // Date time string in date-time form with milliseconds and time zone,
  // e.g., '2015-08-01T10:00:00.000+01:00'
  createdAt: string;
};