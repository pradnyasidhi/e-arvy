const supabaseUrl = 'https://oqjzikfugwqbynmeiaws.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xanppa2Z1Z3dxYnlubWVpYXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MDY3NTAsImV4cCI6MjEwNjM4Mjc1MH0.gXgAP88YqmoTrsWUmj1WTWyHzs9SZWWIpdrYcOkiolg';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);


 const defaultUsers = [
  { username: 'nami', password: CryptoJS.SHA256('0401072').toString(), role: 'Admin', prodiName: '', kompiName: '', profilePhoto: '' },
          { username: 'piket', password: CryptoJS.SHA256('piket6').toString(), role: 'Piket', prodiName: '', kompiName: '', profilePhoto: '' },
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