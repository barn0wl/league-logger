import { BuildFilter, ReferenceEntity } from "../../types";

// Editor for BuildFilter
interface BuildFilterEditorProps {
  filter: BuildFilter;
  onChange: (newFilter: BuildFilter) => void;
  keystoneOptions: ReferenceEntity[];
  runeOptions: ReferenceEntity[];
  shardOptions: ReferenceEntity[];
  itemOptions: ReferenceEntity[];
  spellOptions: ReferenceEntity[];
}

const BuildFilterEditor: React.FC<BuildFilterEditorProps> = ({
  filter,
  onChange,
  keystoneOptions,
  runeOptions,
  shardOptions,
  itemOptions,
  spellOptions,
}) => {
  const updateField = <K extends keyof BuildFilter>(key: K, value: BuildFilter[K]) => {
    onChange({ ...filter, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Keystone</label>
        <select
          className="mt-1 block w-full border rounded p-2"
          value={filter.keystoneId || ''}
          onChange={e => updateField('keystoneId', e.target.value || undefined)}
        >
          <option value="">— None —</option>
          {keystoneOptions.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>
      <fieldset>
        <legend className="text-sm font-medium">Runes</legend>
        {[0,1,2,3,4].map(i => (
          <div key={i} className="mt-2">
            <label className="block text-sm">Rune {i+1}</label>
            <select
              className="mt-1 block w-full border rounded p-2"
              value={(filter as any).runeIds?.[i] || ''}
              onChange={e => {
                const ids = [...(filter as any).runeIds || []] as string[];
                ids[i] = e.target.value;
                updateField('runeIds', ids);
              }}
            >
              <option value="">—</option>
              {runeOptions.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend className="text-sm font-medium">Shards</legend>
        {[0,1,2].map(i => (
          <div key={i} className="mt-2">
            <label className="block text-sm">Shard {i+1}</label>
            <select
              className="mt-1 block w-full border rounded p-2"
              value={(filter as any).shardIds?.[i] || ''}
              onChange={e => {
                const ids = [...(filter.shardIds || [])] as string[];
                ids[i] = e.target.value;
                updateField('shardIds', ids);
              }}
            >
              <option value="">—</option>
              {shardOptions.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        ))}
      </fieldset>
      <div>
        <label className="block text-sm font-medium">Starter Item</label>
        <select
          className="mt-1 block w-full border rounded p-2"
          value={filter.starterItemId || ''}
          onChange={e => updateField('starterItemId', e.target.value || undefined)}
        >
          <option value="">— None —</option>
          {itemOptions.map(it => (
            <option key={it.id} value={it.id}>{it.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Boots</label>
        <select
          className="mt-1 block w-full border rounded p-2"
          value={filter.bootsItemId || ''}
          onChange={e => updateField('bootsItemId', e.target.value || undefined)}
        >
          <option value="">— None —</option>
          {itemOptions.map(it => (
            <option key={it.id} value={it.id}>{it.name}</option>
          ))}
        </select>
      </div>
        {[0, 1, 2].map((idx) => (
            <div key={idx}>
            <label className="block text-sm font-medium">Core Item {idx + 1}</label>
            <select
                className="mt-1 block w-full border rounded p-2"
                value={filter.coreItemIds?.[idx] || ''}
                onChange={e => {
                const ids = [...(filter.coreItemIds || [])];
                ids[idx] = e.target.value;
                updateField('coreItemIds', ids);
                }}
            >
                <option value="">— None —</option>
                {itemOptions.map(it => (
                <option key={it.id} value={it.id}>{it.name}</option>
                ))}
            </select>
            </div>
        ))}
      <fieldset>
        <legend className="text-sm font-medium">Summoner Spells</legend>
        {[0,1].map(i => (
          <div key={i} className="mt-2">
            <label className="block text-sm">Spell {i+1}</label>
            <select
              className="mt-1 block w-full border rounded p-2"
              value={filter.summonerSpellIds?.[i] || ''}
              onChange={e => {
                const spells = [...(filter.summonerSpellIds || [])];
                spells[i] = e.target.value;
                updateField('summonerSpellIds', spells);
              }}
            >
              <option value="">—</option>
              {spellOptions.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        ))}
      </fieldset>
    </div>
  );
};

export default BuildFilterEditor;