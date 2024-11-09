from cryptography.fernet import Fernet

# Your existing secret key (replace this with your actual key)
SECRET_KEY = b'Rk1IU0NKbFJXa2hpRzJ0NUNZYVlNOUU4a2hxR3A4dzY='
cipher = Fernet(SECRET_KEY)

def encrypt_password(password):
    # Encrypt the password (convert it to bytes before encrypting)
    encrypted_password = cipher.encrypt(password.encode())
    return encrypted_password.decode()  # Decode to get a string for easier handling

# Enter your password here
password = "pass"
encrypted_password = encrypt_password(password)
print(f"Encrypted Password: {encrypted_password}")
