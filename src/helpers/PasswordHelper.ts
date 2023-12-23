// import from @types/bcrypt
import { hash, compare } from 'bcrypt';

class PasswordHelper {
  public async hash(password: string): Promise<string> {
    return hash(password, 10);
  }

  public async compare(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}

export default PasswordHelper;