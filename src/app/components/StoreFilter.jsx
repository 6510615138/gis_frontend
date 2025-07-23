import React, { useState } from 'react';

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
      { value: 'MaxValuTanjai', label: 'MaxValu Tanjai' },
      { value: 'Freshmart', label: 'Freshmart' },
      { value: 'TopSmall', label: 'Tops Daily' },
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

const StoreFilter = ({ setSelectedStoreFunction}) => {
  const [selected, setSelected] = useState({});   // selected store checkbox 
  const [collapsed, setCollapsed] = useState({}); // store collapsed state

  const submitStore = () => {
    console.log("submitted", selected)
    setSelectedStoreFunction(selected)
  };

  const handleCheckboxChange = (name, checked) => {
    setSelected(prev => ({ ...prev, [name]: checked }));
  };

  const handleCheckboxGroup = (groupKey, checked) => {
    const group = categories.find(c => c.key === groupKey);
    if (!group) return;
    const updates = {};
    group.options.forEach(opt => {
      updates[opt.value] = checked;
    });
    setSelected(prev => ({ ...prev, ...updates }));
  };

  const toggleCollapse = (key) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div id="store" className="w-75" style={{ display: 'block' }}>
      <h2 className="text-lg font-semibold mb-2">แสดงข้อมูลร้านค้า</h2>
      <form name="store">
        <div className="row pb-3">
          {categories.map(category => {
            const allSelected = category.options.every(opt => selected[opt.value]);
            const isCollapsed = collapsed[category.key];

            return (
              <div key={category.key} className="col border-end">
                <div className="d-flex justify-content-between ">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary w-full"
                    onClick={() => toggleCollapse(category.key)}
                  >
                    <div className="w-full px-4 py-1.5 rounded-xs 
                    cursor-pointer hover:bg-blue-tcct hover:text-white 
                    justify-items-start text-start"
                    >{category.label} {isCollapsed ?'▴' : '▾' }</div>
                  </button>


                </div>
                {isCollapsed && (
                  <>
                    <div className='mx-auto px-8'>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={category.key}
                        checked={allSelected}
                        onChange={e => handleCheckboxGroup(category.key, e.target.checked)}
                      />
                      <label htmlFor={category.key} className="ms-1">Select all</label>
                      <br />
                      {category.options.map(opt => (
                        <div key={opt.value} className="ms-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={opt.value}
                            checked={!!selected[opt.value]}
                            onChange={e => handleCheckboxChange(opt.value, e.target.checked)}
                          />
                          <label htmlFor={opt.value} className="ms-1">{opt.label}</label>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </form>
      <button
        type="button"
        className="btn btn-secondary btn-sm submitStoreBtn mt-2 border-1 cursor-pointer hover:text-white hover:bg-blue-tcct px-4 py-2 rounded-full"
        onClick={submitStore}
      >
        อัพเดท
      </button>
    </div>
  );
};

export default StoreFilter;
