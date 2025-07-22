import React, { useState } from 'react';

// Define categories and their options
const categories = [
  {
    key: 'Speciality_Store',
    label: 'Speciality Store',
    options: [
      { value: 'CP', label: 'CP Fresh Mart' },
      { value: 'PurePharmacy', label: 'PurePharmacy' },
      { value: 'CentralFoodHall', label: 'CentralFoodHall' },
      { value: 'Eathai', label: 'Eathai' },
      { value: 'Healthiful', label: 'Healthiful' },
      { value: 'BigCFoodPlace', label: 'BigC Food Place' },
    ],
  },
  {
    key: 'Convenience_Stores',
    label: 'Convenience Store',
    options: [
      { value: '7-11', label: '7-11' },
      { value: 'FamilyMart', label: 'FamilyMart' },
      { value: 'Lawson', label: 'Lawson 108' },
      { value: 'Jiffy', label: 'Jiffy' },
      { value: 'CJ_Express', label: 'CJ Express' },
      { value: 'MaxValuTanjai', label: "MaxValu Tanjai" },
      { value: 'Freshmart', label: 'Freshmart' },
      { value: 'TopSmall', label: "Tops Daily" },
      { value: 'Big_mini', label: 'mini BigC' },
      { value: 'TescoSmall', label: "Lotus's Go Fresh" },
    ],
  },
  {
    key: 'Supermarket',
    label: 'Supermarket',
    options: [
      { value: 'Villa', label: 'Villa Market' },
      { value: 'CJ_Supermarket', label: 'CJ Market' },
      { value: 'MaxValu', label: 'MaxValu' },
      { value: 'TopSuper', label: 'Tops Market' },
      { value: 'BigC_Super', label: 'BigC Market' },
      { value: 'TescoSuper', label: "Lotus's Market" },
    ],
  },
  {
    key: 'Hypermarket',
    label: 'Hypermarket',
    options: [
      { value: 'BigC_Hyper', label: 'BigC Supercenter' },
      { value: 'TescoHyper', label: 'Lotus Extra' },
    ],
  },
  {
    key: 'Wholesale',
    label: 'Wholesale',
    options: [
      { value: 'Makro', label: 'Makro' },
    ],
  },
];

const StoreFilter = ({ submitStore }) => {
  // Track individual checkbox states
  const [selected, setSelected] = useState({});

  // Toggle a single checkbox
  const handleCheckboxChange = (name, checked) => {
    setSelected(prev => ({ ...prev, [name]: checked }));
  };

  // Toggle a whole group
  const handleCheckboxGroup = (groupKey, checked) => {
    const group = categories.find(c => c.key === groupKey);
    if (!group) return;
    const updates = {};
    group.options.forEach(opt => {
      updates[opt.value] = checked;
    });
    setSelected(prev => ({ ...prev, ...updates }));
  };

  return (
    <div id="shopping" className="w-75" style={{ display: 'block' }}>
      <form name="shopping">
        <div className="row pb-2">
          {categories.map(cat => {
            // determine if all options in this category are selected
            const allSelected = cat.options.every(opt => selected[opt.value]);
            return (
              <div key={cat.key} className="col border-end mt-3">
                <div className="text-center shop-type">{cat.label}</div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={cat.key}
                  checked={allSelected}
                  onChange={e => handleCheckboxGroup(cat.key, e.target.checked)}
                />
                <label htmlFor={cat.key}>Select all</label>
                <br />
                {cat.options.map(opt => (
                  <React.Fragment key={opt.value}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={opt.value}
                      checked={!!selected[opt.value]}
                      onChange={e => handleCheckboxChange(opt.value, e.target.checked)}
                    />
                    <label htmlFor={opt.value}>{opt.label}</label>
                    <br />
                  </React.Fragment>
                ))}
              </div>
            );
          })}
        </div>
      </form>
      <button
        type="button"
        className="btn btn-secondary btn-sm submitStoreBtn"
        onClick={submitStore}
      >
        อัพเดทการแสดงผลร้านค้า
      </button>
    </div>
  );
};

export default StoreFilter;

