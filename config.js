const supabaseUrl = 'https://ygfzxemuzhwwadamkgen.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZnp4ZW11emh3d2FkYW1rZ2VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NjA1ODAsImV4cCI6MjA5NzQzNjU4MH0.sY1ffJXkef3wUxRfaoD8ecAitQtdN9fFNeCxJjXnoPo';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

 const users = [
          { username: 'nami', password: CryptoJS.SHA256('0401072').toString(), role: 'Admin', prodiName: '', kompiName: '', profilePhoto: '' },
          { username: 'piket', password: CryptoJS.SHA256('piket6').toString(), role: 'Piket', prodiName: '', kompiName: '', profilePhoto: '' },
          // Tambahkan 5 akun baru di sini (Diberi akses setara Admin)
          { username: 'danyon', password: CryptoJS.SHA256('danyon6').toString(), role: 'Piket', prodiName: '', kompiName: '', profilePhoto: '' },
          { username: 'wadanyon', password: CryptoJS.SHA256('wadanyon6').toString(), role: 'Piket', prodiName: '', kompiName: '', profilePhoto: '' },
          { username: 'danki', password: CryptoJS.SHA256('danki6').toString(), role: 'Piket', prodiName: '', kompiName: '', profilePhoto: '' },
          { username: 'danton', password: CryptoJS.SHA256('danton6').toString(), role: 'Piket', prodiName: '', kompiName: '', profilePhoto: '' },
          { username: 'pasi', password: CryptoJS.SHA256('pasi6').toString(), role: 'Piket', prodiName: '', kompiName: '', profilePhoto: '' }
        ];

const piketPasswords = {
  putra: 'piketpa6',
  putri: 'piketpi6'
};