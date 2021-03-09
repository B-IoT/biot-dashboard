import { useRef, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter(props: {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  children: ReactNode;
}) {
  const ref = useRef(null);

  useEffect(() => {
    let drag = false;

    document.addEventListener('mousedown', () => (drag = false));
    document.addEventListener('mousemove', () => (drag = true));

    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      // @ts-ignore
      if (ref && !drag && ref.current && !ref.current.contains(event.target)) {
        props.setValue(props.value);
      }
    }

    // Bind the event listener
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, props.value]);

  return <div ref={ref}>{props.children}</div>;
}
