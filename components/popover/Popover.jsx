import { Popover as AntDPopover } from 'antd'
import styles from './Popover.module.scss'

export const Popover = ({
  content,
  trigger = 'click',
  //   containerStyle,
  children,
  title,
  placement,
  visible,
  width,
  popoverActive = true,
  ...rest
}) => {
  return (
    <>
      {popoverActive ? (
        <AntDPopover
          className={styles.popOverButtonContainer}
          style={{ width: width }}
          {...{ content, trigger, placement, visible }}
          {...rest}
        >
          {children}
        </AntDPopover>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
