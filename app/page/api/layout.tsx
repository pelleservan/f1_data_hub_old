import styles from './styles.module.css'

export default function ContactLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className={styles.contact}>{children}</section>
  }