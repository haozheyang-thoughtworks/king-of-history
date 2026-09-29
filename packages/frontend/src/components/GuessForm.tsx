import { useState, type FormEvent } from 'react';

interface GuessFormProps {
  disabled?: boolean;
  onSubmit: (name: string) => void;
}

export function GuessForm({ disabled, onSubmit }: GuessFormProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = value.trim();
    if (!name || disabled) return;
    onSubmit(name);
    setValue('');
  };

  return (
    <form className="guess-form" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="请输入你猜测的英雄名字…"
        disabled={disabled}
      />
      <button className="primary-button" type="submit" disabled={disabled || !value.trim()}>
        提交猜测
      </button>
    </form>
  );
}

