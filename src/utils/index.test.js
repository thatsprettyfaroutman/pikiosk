import {
  timeBetweenTramAndNow,
} from './'

describe('timeBetweenTramAndNow', () => {

  const time = (hours, minutes) => hours * 60 * 60 + minutes * 60

  it('should return minutes to next tram arrival or something', () => {
    expect(timeBetweenTramAndNow(time(9,10),time(9,0))).toBe(time(0, 10))
    expect(timeBetweenTramAndNow(time(8,30),time(8,0))).toBe(time(0, 30))
    expect(timeBetweenTramAndNow(time(18,0),time(12,0))).toBe(time(6, 0))
  })

  it('should return minutes correctly when day changes', () => {
    expect(timeBetweenTramAndNow(time(24,10),time(23,59))).toBe(time(0, 11))
    expect(timeBetweenTramAndNow(time(25,0),time(0,0))).toBe(time(1, 0))
    expect(timeBetweenTramAndNow(time(24,30),time(1,0))).toBe(time(0, -30))
    expect(timeBetweenTramAndNow(time(24,10),time(0,11))).toBe(time(0, -1))
  })
})
