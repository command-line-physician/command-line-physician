const Herb = require('../../lib/models/herbSchema');
const mongoose = require('mongoose');

describe('testing our herb schema', () => {
  it('creates an herb with all required fields', () => {
    const herb = new Herb({
      name: 'lobelia',
      category: 'nervine & antispasmodic',
      latin_name: 'lobelia inflata',
      medicinal_uses: 'cures everything',
      description: 'is a smart herb'
    });
    expect(herb.toJSON()).toEqual({
      name: 'lobelia',
      category: 'nervine & antispasmodic',
      latin_name: 'lobelia inflata',
      medicinal_uses: 'cures everything',
      description: 'is a smart herb',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has required fields', () => {
    const herb = new Herb({}); 
    const errors = herb.validateSync().errors;
    expect(errors.category.message).toEqual('Path `category` is required.');
    expect(errors.name.message).toEqual('Path `name` is required.')
    expect(errors.latin_name.message).toEqual('Path `latin_name` is required.')
    expect(errors.description.message).toEqual('Path `description` is required.')
  });
});
