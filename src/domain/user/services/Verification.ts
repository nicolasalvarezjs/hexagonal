export interface VerificationService {
  sendCode: (phone: string) => Promise<boolean>;
  verify: (phone: string, code: string) => Promise<boolean>;
}
