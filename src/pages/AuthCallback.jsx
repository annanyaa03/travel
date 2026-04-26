import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error during auth callback:', error.message);
        navigate('/login');
      } else {
        // Success! Redirect to dashboard
        navigate('/dashboard');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FAF9F6',
      fontFamily: 'Fraunces, serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '300', marginBottom: '16px' }}>
          Finalizing your journey...
        </h2>
        <div className="loading-spinner" style={{
          width: '40px',
          height: '40px',
          border: '2px solid rgba(201, 168, 76, 0.1)',
          borderTop: '2px solid #C9A84C',
          borderRadius: '50%',
          margin: '0 auto',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AuthCallback;
