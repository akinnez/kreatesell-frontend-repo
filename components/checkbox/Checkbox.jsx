import styles from './Checkbox.module.scss'

export const Checkbox = ({ onChange, name, children = null, ...rest }) => {
  return (
    <label className={styles.checkbox}>
      <input
        {...rest}
        name={name}
        onChange={onChange}
        type="checkbox"
        className={`${styles.input} ${rest.className}`}
      />
      {children}
    </label>
  )
}
