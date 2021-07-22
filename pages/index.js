import Head from 'next/head'
import Recorder from '../components/mainPage/Recorder'
import mainPageStyles from '../styles/MainPage.module.css'

export default function Home() {
  return (
    <div>
      <div className={mainPageStyles.description}>
        <h1>Microphone audio recorder</h1>
        <p>This app can record your voice</p>
      </div>
      <Recorder />
    </div>
  )
}
