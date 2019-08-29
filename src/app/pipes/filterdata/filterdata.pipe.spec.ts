import { FilterdataPipe } from './filterdata.pipe';

describe('Pipe: Filterdata', () => {
    let pipe: FilterdataPipe;

    beforeEach(() => {
        pipe = new FilterdataPipe();
    });

    it('providing no value returns empty array', () => {
        expect(pipe.transform([], '')).toEqual([]);
    });

    it('providing a value and no search key returns value', () => {
        expect(pipe.transform(['angular', 'java'], '')).toEqual(['angular', 'java']);
    });

    it('providing no value but providing search key returns empty array', () => {
        expect(pipe.transform([], 'ang')).toEqual([]);
    });

    it('providing both value and search key returns filtered data', () => {
        expect(pipe.transform(['angular', 'java'], 'ang')).toEqual(['angular']);
    });
});

