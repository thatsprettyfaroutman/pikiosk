import {
  getMinutesToNextMatching,
} from './'

describe('getMinutesToNextMatching', () => {
  it('should return minutes to next half hour', () => {
    let testDate = new Date()
    testDate.setHours(20, 15, 14)
    expect(getMinutesToNextMatching(testDate)).toBe(15)

    testDate = new Date()
    testDate.setHours(10, 10, 50)
    expect(getMinutesToNextMatching(testDate)).toBe(20)

    testDate = new Date()
    testDate.setHours(12, 50, 34)
    expect(getMinutesToNextMatching(testDate)).toBe(10)

    testDate = new Date()
    testDate.setHours(12, 59, 23)
    expect(getMinutesToNextMatching(testDate)).toBe(1)

    testDate = new Date()
    testDate.setHours(12, 29, 4)
    expect(getMinutesToNextMatching(testDate)).toBe(1)

    testDate = new Date()
    testDate.setHours(12, 30, 1)
    expect(getMinutesToNextMatching(testDate)).toBe(30)

    testDate = new Date()
    testDate.setHours(12, 0, 31)
    expect(getMinutesToNextMatching(testDate)).toBe(30)
  })
})
