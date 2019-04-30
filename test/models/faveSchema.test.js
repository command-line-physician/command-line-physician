const mongoose = require('mongoose');
const Fave = require('../../lib/models/faveSchema');

describe('tests fave schema', () => {
  it('creates a favorite herb', () => {
    const userId = mongoose.Types.ObjectId();
    const herbId = mongoose.Types.ObjectId();
    const fave = new Fave({
      user: userId,
      herb: herbId
    });
    expect(fave.toJSON()).toEqual({
      user: expect.any(mongoose.Types.ObjectId),
      herb: expect.any(mongoose.Types.ObjectId),
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('has required fields', () => {
    const fave = new Fave({

    });
    const errors = fave.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
    expect(errors.herb.message).toEqual('Path `herb` is required.');
  });
});
