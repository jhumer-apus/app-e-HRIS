import { useRef, useState, useEffect } from "react";
import styles from "./CollapsibleSection.module.scss";
import { useLocation } from "react-router-dom";


type CollapsibleSectionProps = {
  children: React.ReactNode;
  className?: string;
  header: React.ReactNode;
};

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ children, header, className }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation(); // Get the current location object from react-router-dom
  const [currentPath, setCurrentPath] = useState<string>(location.pathname);

  useEffect(() => {
    if(contentRef.current) {
      contentRef.current.setAttribute("data-collapsed", "true");
      contentRef.current.style.height = "0px";
    }
  }, []);

  useEffect(() => {
    const checkDataLink = () => {
      if (contentRef.current) {
        const childrenNodes = contentRef.current.children;
        if (childrenNodes) {
          for (let i = 0; i < childrenNodes.length; i++) {
            const childNode = childrenNodes[i] as HTMLElement;
            const dataLink = childNode.getAttribute("data-link");
            if (window.location.pathname.includes(dataLink || '')) {
              expandSection(contentRef.current);
            } else {
              // I know it might be tempting to add a collapseSection function here,
              // But know that this might be a buggy endeavour. Therefore, try to study the whole
              // implementation first before doing so, *wink. You might need to 
              // revise the whole logic first :D 
              // console.log('here') and see that its rendered 29+ times. 
              // This might be related to the reason why the animation is kinda glitchy 
            }
          }
        }
      }
    };

    checkDataLink();
    setCurrentPath(location.pathname);
  }, [currentPath]);

  const collapseSection = (element: HTMLElement) => {
    const sectionHeight = element.scrollHeight;

    const elementTransition = element.style.transition;
    element.style.transition = "";

    requestAnimationFrame(() => {
      element.style.height = sectionHeight + "px";
      element.style.transition = elementTransition;

      requestAnimationFrame(() => {
        element.style.height = "0px";
      });
    });

    element.setAttribute("data-collapsed", "true");
  };

  const expandSection = (element: HTMLElement) => {
    const sectionHeight = element.scrollHeight;

    element.style.height = sectionHeight + "px";

    element.addEventListener("transitionend", function transitionEndListener() {
      element.removeEventListener("transitionend", transitionEndListener);
      element.style.height = "";
    });

    element.setAttribute("data-collapsed", "false");
  };

  const toggleCollapse = () => {
    if (contentRef.current) {
      const isCollapsed = contentRef.current.getAttribute('data-collapsed') === 'true';
      if (isCollapsed) {
        expandSection(contentRef.current);
      } else {
        collapseSection(contentRef.current);
      }
    }
  };

  return (
    <div className={styles.section}>
        <div className={styles.sectionHeader} onClick={toggleCollapse}>
            {header}
        </div>
        <div className={styles.sectionContent} ref={contentRef} path-name="debug.child">
            {children}
        </div>
  </div>
  );
};

export default CollapsibleSection;