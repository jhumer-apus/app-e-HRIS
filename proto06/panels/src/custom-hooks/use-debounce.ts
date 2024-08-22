import { useEffect, useState } from "react";



/** 
 * How To Use:  
 * 
 * export default function Page() {
 *  const [input, setInput] = useState ("");
 *  const debouncedInput = useDebounce(input);
 * 
 *  return (
 *      <div>
 *          <input
 *              type="text"
 *              value={input}
 *              onChange={(e) => setInput(e.target.value)}
 *              placeholder="Type something..."
 *              className="p-3"
 *          />
 *          <p>Debounced: {debouncedInput}</p>
 *      </div>
 *  )
 * 
 * }
 * 
*/
export default function useDebounce<T>(
    value: T, delay: number = 250
): T {

    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(()=> {
            setDebouncedValue(value);
        }, delay)

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;

};



//shorts / 0K272EQZFLs

