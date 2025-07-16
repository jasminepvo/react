import React from 'react';
import { useDateFieldContext } from './DateFieldContext';

const HelpText: React.FC = () => {
  const ctx = useDateFieldContext();
  if (!ctx.helpText) return null;
  return <p className='mt-1 ml-1 text-xs text-black'>{ctx.helpText}</p>;
};

export default HelpText;
