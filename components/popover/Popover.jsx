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
  ...rest
}) => {
  return (
    <AntDPopover
      className={styles.popOverButtonContainer}
      style={{ width: width }}
      {...{ content, trigger, placement, visible }}
      {...rest}
    >
      {children}
    </AntDPopover>
  )
}
