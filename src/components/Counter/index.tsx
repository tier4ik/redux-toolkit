import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { useState } from "react";
import { RootState, AppDispatch } from "../../store/store";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Counter = (): JSX.Element => {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  const [incAmount, setIncAmount] = useState<number>(0);

  const resetAll = (): void => {
    setIncAmount(0);
    dispatch(reset());
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value: val } = e.currentTarget;
    if (val) {
      if (!isNaN(+val) && Number.isFinite(+val)) {
        setIncAmount(+val);
      }
    }
  };

  return (
    <section>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={resetAll}>RESET</button>
      <hr />
      <input type="text" value={incAmount} onChange={handleChange} />
      <button onClick={() => dispatch(incrementByAmount(incAmount))}>
        Increment by {incAmount}
      </button>
    </section>
  );
};

export default Counter;
