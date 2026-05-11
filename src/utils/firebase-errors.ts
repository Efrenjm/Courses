export function getFirebaseErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/operation-not-allowed':
      return 'Registration is currently disabled.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'User not found.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/invalid-credential':
      return 'Invalid login credentials.';
    case 'auth/popup-closed-by-user':
      return 'The login popup was closed before completion.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}
