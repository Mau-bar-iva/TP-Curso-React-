import { useState } from 'react';

export const Count = ({ btnText, onConfirm }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  const confirm = () => {
    if (count > 0) onConfirm(count);
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between gap-3 rounded-full border border-stone-300 bg-white px-3 py-2">
        <span className="text-sm font-medium uppercase tracking-[0.18em] text-stone-600">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 bg-stone-100 text-lg text-stone-800 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={decrement}
            disabled={count === 0}
          >
            -
          </button>
          <span className="min-w-6 text-center text-base font-semibold text-stone-900">{count}</span>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 bg-stone-100 text-lg text-stone-800"
            onClick={increment}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-full bg-stone-900 px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={confirm}
        disabled={count === 0}
      >
        {btnText}
      </button>
    </div>
  );
};
