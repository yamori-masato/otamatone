import p5 from 'p5'
import pushPopDecorator from './pushPopDecorator'

class Otamatone implements P5Obj {
  face: NoteHead
  neck: Neck

  constructor(
    private p: p5,
    public x: number,
    public y: number,
  ) {
    const long = 110
    const short = 100
    this.face = new NoteHead(p, 0, 0, long, short)
    const length = long * 3
    this.neck = new Neck(p, 0, -length/2 -short/2, length)
  }

  update(x: number, y: number) {
    const [ax, ay] = [this.x + x, this.y + y] // this.x, yの絶対座標
    this.neck.update(ax, ay)
    this.face.update(ax, ay)

    this.face.setLevel(this.neck.getLevel())
  }

  @pushPopDecorator
  display() {
    this.setupP5Style()

    this.neck.display()
    this.face.display()
  }

  getLevel() {
    return this.neck.getLevel()
  }

  private setupP5Style() {
    this.p.translate(this.x, this.y)
    this.p.noStroke()
    this.p.fill(255)
  }
}

class NoteHead implements P5Obj {
  constructor(
    private p: p5,
    public x: number,
    public y: number,
    private long: number,
    private short: number,
    public level = 0,
  ) { }

  update(x: number, y: number) { }

  @pushPopDecorator
  display() {
    this.p.translate(this.x, this.y)
    this.drawBase()
    this.drawEyes()
    this.drawMouse()
  }

  setLevel(v: number) {
    this.level = v
  }

  private drawBase() {
    this.p.ellipse(0, 0, this.long, this.short)
  }

  @pushPopDecorator
  private drawEyes() {
    this.p.fill(0)
    
    const y = this.p.map(this.level, 0, 1, -10, -16)
    this.p.ellipse(-20, y, 10, 10)
    this.p.ellipse(20, y, 10, 10)
  }

  @pushPopDecorator
  private drawMouse() {
    this.p.stroke(0)
    this.p.fill(240)
    this.p.strokeWeight(2)
    this.p.translate(0, 12)
    const x1 = - this.long / 2
    const x2 = + this.long / 2

    const uy = this.p.map(this.level, 0, 1, 0, -12)
    const ly = this.p.map(this.level, 0, 1, 0, 20)
    this.p.beginShape()
    this.p.vertex(x1, -8)
    this.p.bezierVertex(x1, uy, x2, uy, x2, -8)
    this.p.bezierVertex(x2, ly, x1, ly, x1, -8)
    this.p.endShape()
  }
}

class Neck implements P5Obj {
  width: number
  short: number
  long: number
  level: number

  constructor(
    private p: p5,
    public x: number,
    public y: number,
    private height: number,
  ) {
    this.width = 24
    this.short = height * 0.1
    this.long = height * 0.9
    this.level = 0
  }

  update(x: number, y: number) {
    const [ax, ay] = [this.x + x, this.y + y]
    // 当たり判定
    const paddingX = 100
    const cx1 = ax - this.width/2 - paddingX
    const cy1 = ay - this.height/2
    const cx2 = cx1 + this.width + paddingX * 2
    const cy2 = cy1 + this.long

    // TODO: ドラック中は当たり判定を無視する。カーソルを手のマークにして、クリックされたらX=0に修正。掴むマークに変更
    if (
      (cx1 < this.p.mouseX && this.p.mouseX < cx2) &&
      (cy1 < this.p.mouseY && this.p.mouseY < cy2) &&
      this.p.mouseIsPressed
    ) {
      this.level = this.p.map(this.p.mouseY, cy1, cy2, 0, 1)
    } else {
      this.level = 0
    }
  }

  getLevel() {
    return this.level
  }

  @pushPopDecorator
  display() {
    this.p.translate(this.x, this.y)
    this.p.rectMode(this.p.CENTER)
    this.p.rect(0, 0, this.width, this.height)
    this.drawJoint()
    this.drawStem()
    this.drawFlag()
  }

  @pushPopDecorator
  private drawJoint() {
    const centerY = this.height / 2 - this.short / 2
    this.p.rect(0, centerY, this.width, this.short)    
  }

  @pushPopDecorator
  private drawStem() {
    this.p.fill(245)
    const centerY = - this.height / 2 + this.long / 2
    this.p.rect(0, centerY, this.width, this.long)

    this.p.strokeWeight(this.width * 0.5)
    this.p.stroke(0)
    const margin = 20
    this.p.line(0, -this.height / 2 + margin, 0, this.height / 2 - this.short - margin)
  }

  @pushPopDecorator
  private drawFlag() {
    const startY = - this.height / 2
    const startX = - this.width / 2
    this.p.beginShape()
    this.p.vertex(startX, startY)
    this.p.vertex(startX, startY - 27)
    this.p.bezierVertex(startX + 7, startY - 26, startX + 21, startY - 30, startX + 19, startY - 43)
    this.p.bezierVertex(startX + 47, startY - 44, startX + 47, startY - 46, startX + 57, startY - 32)
    this.p.bezierVertex(startX + 65, startY - 21, startX + 76, startY - 4, startX + 89, startY - 17)
    this.p.bezierVertex(startX + 100, startY - 29, startX + 99, startY - 22, startX + 96, startY - 15)
    this.p.bezierVertex(startX + 85, startY + 3, startX + 72, startY + 7, startX + 47, startY - 16)
    this.p.bezierVertex(startX + 40, startY - 22, startX + 23, startY - 26, startX + this.width, startY)
    this.p.endShape()
  }
}

export default Otamatone