import fetchLightning from '../src/api/fetchLightning';

describe('Fetch lightning data with http client', () => {
    it('GET /lightning status to be 200', () => {
        fetchLightning().then(({ status }) => {
            expect(status).toBe(200)
        })
    })
})
