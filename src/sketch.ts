import p5 from 'p5'
import Otamatone from './Otamatone'
import * as Tone from 'tone'

const sketch = (p: p5) => {
  let otama: Otamatone
  let synth: Tone.Synth
  let shifter: Tone.PitchShift
  let flag = false

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    otama = new Otamatone(p, p.width / 2, p.height / 2 + 100)
    shifter = new Tone.PitchShift(2).toDestination()
    synth = new Tone.Synth().connect(shifter)
    Tone.now()
  }

  p.draw = () => {
    p.background(200)

    otama.update(0, 0)
    otama.display()

    // sounds
    const level = otama.getLevel()
    if (level) {
      if (!flag) {
        synth.triggerAttack("C4")
        flag = true
      }
      shifter.pitch = p.map(level, 0, 1, 0, 12)
    } else {
      if (flag) {
        flag = false
        synth.triggerRelease()
      }
    }
  }
}

export default sketch