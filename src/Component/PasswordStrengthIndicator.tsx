import React from "react";
import "../styles.css";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const getPasswordStrength = (password: string) => {
  if (password.length < 6) return "weak";
  if (password.match(/[A-Za-z]/) && password.match(/[0-9]/)) return "medium";
  if (password.match(/[@$!#]/)) return "strong";
  return "weak";
};

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
}) => {
  if (!password) return null;
  const strength = getPasswordStrength(password);

  return (
    <p className={`password-strength ${strength}`} aria-live="polite">
      Password Strength: {strength.charAt(0).toUpperCase() + strength.slice(1)}
    </p>
  );
};

export default PasswordStrengthIndicator;
