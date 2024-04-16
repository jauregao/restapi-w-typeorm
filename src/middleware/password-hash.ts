import bcrypt from 'bcrypt';

async function passwordHashed(plainTextPassword: string) {
  return await bcrypt.hash(plainTextPassword, Number(process.env.SALT))
}

async function comparePasswordHashed(password: string, userPassword:string) {
  return await bcrypt.compare(password, userPassword)
}

export {
  passwordHashed,
  comparePasswordHashed
}
