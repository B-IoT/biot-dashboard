import {
  useRef,
  useEffect,
  MutableRefObject,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  ref: MutableRefObject<any>,
  value: any,
  setValue: Dispatch<SetStateAction<any>>,
  detectDrag: boolean
) {
  useEffect(() => {
    let drag = false;

    if (detectDrag) {
      document.addEventListener('mousedown', () => (drag = false));
      document.addEventListener('mousemove', () => (drag = true));
    }

    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref && !drag && ref.current && !ref.current.contains(event.target)) {
        setValue(value);
      }
    }

    // Bind the event listener
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [detectDrag, ref, setValue, value]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter(props: {
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  detectDrag: boolean;
  children: ReactNode;
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.value, props.setValue, props.detectDrag);

  return <div ref={wrapperRef}>{props.children}</div>;
}
