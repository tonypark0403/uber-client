import React from 'react';

interface IProps {
  submitFn: any;
  className?: string;
}

const Form: React.FC<IProps> = ({ submitFn, className, children }) => (
  <form
    className={className}
    onSubmit={(e) => {
      e.preventDefault();
      console.log('clicked');
      submitFn();
    }}>
    {children}
  </form>
);

export default Form;
