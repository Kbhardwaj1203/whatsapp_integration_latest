import React, { useState } from "react";

export default function AddContact() {
  const [form, setForm] = useState({
    phone: "",
    name: "",
    role: "",
    operatorMessage: "",
    avatarUrl: "",
    hours: {
      monday: { from: "", to: "" },
      tuesday: { from: "", to: "" },
      wednesday: { from: "", to: "" },
      thursday: { from: "", to: "" },
      friday: { from: "", to: "" },
      saturday: { from: "", to: "" },
      sunday: { from: "", to: "" },
    },
  });
  const [showPreview, setShowPreview] = useState(false);

  const inputBase =
    "w-full mt-1 px-3 py-2 border border-[#0b1e39]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b1e39]/30 bg-[#fffff0] text-[#0b1e39]";

  const onChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));
  const onHourChange = (day, key) => (e) => setForm((s) => ({
    ...s,
    hours: { ...s.hours, [day]: { ...s.hours[day], [key]: e.target.value } },
  }));

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow border border-[#0b1e39]/10 overflow-hidden">
      <header className="px-6 py-4 bg-[#0b1e39] text-[#fffff0]">
        <h2 className="text-lg font-bold">Add Contact</h2>
      </header>

      <div className="p-6 space-y-8">
        <div className="bg-[#f7fafc] p-4 rounded-lg border border-[#0b1e39]/10 text-sm text-[#0b1e39]">
          <p className="font-semibold mb-2">Guidelines</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Add at the start if ISD code is not included 91 for IN</li>
            <li>WhatsApp Phone Number with ISD code of Your Country</li>
            <li>To Hide Operator delete number and SAVE</li>
            <li>Dont give + 00 or Space in number. It will work</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">WhatsApp Phone Number (with ISD)</label>
            <input className={inputBase} value={form.phone} onChange={onChange("phone")} placeholder="e.g., 919876543210" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Agent Name</label>
            <input className={inputBase} value={form.name} onChange={onChange("name")} placeholder="e.g., John Doe" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Agent Role</label>
            <input className={inputBase} value={form.role} onChange={onChange("role")} placeholder="e.g., Support" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0b1e39]">Message by Operator</label>
            <textarea className={inputBase} rows={3} value={form.operatorMessage} onChange={onChange("operatorMessage")} placeholder="Hello! How may I help you today?" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#0b1e39]">Agent Avatar (Profile Image URL)</label>
            <input className={inputBase} value={form.avatarUrl} onChange={onChange("avatarUrl")} placeholder="Paste image URL from Shopify > Files (250x250 recommended)" />
          </div>
        </div>

        <div>
          <div className="text-sm font-bold text-[#0b1e39] mb-3">Online Hours for Chat Agent store’s timezone (Europe/Rome)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(form.hours).map(([day, val]) => (
              <div key={day} className="bg-white p-4 rounded-lg border border-[#0b1e39]/10">
                <div className="font-semibold text-[#0b1e39] capitalize mb-2">{day}</div>
                <div className="flex gap-3 items-center">
                  <span className="text-sm">From</span>
                  <input type="time" className={inputBase} value={val.from} onChange={onHourChange(day, "from")} />
                  <span className="text-sm">To</span>
                  <input type="time" className={inputBase} value={val.to} onChange={onHourChange(day, "to")} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 rounded-md border border-[#0b1e39]/20 bg-white" onClick={() => setShowPreview(false)}>Cancel</button>
          <button className="px-4 py-2 rounded-md bg-[#0b1e39] text-[#fffff0]" onClick={() => setShowPreview(true)}>Save</button>
        </div>

        {showPreview && (
          <div className="mt-6 bg-white rounded-xl shadow border border-[#0b1e39]/10 p-6">
            <div className="text-lg font-bold mb-4 text-[#0b1e39]">Preview</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <tbody>
                  <tr><th className="py-2 px-3 bg-[#f7fafc] border">Phone</th><td className="py-2 px-3 border">{form.phone || "—"}</td></tr>
                  <tr><th className="py-2 px-3 bg-[#f7fafc] border">Agent Name</th><td className="py-2 px-3 border">{form.name || "—"}</td></tr>
                  <tr><th className="py-2 px-3 bg-[#f7fafc] border">Agent Role</th><td className="py-2 px-3 border">{form.role || "—"}</td></tr>
                  <tr><th className="py-2 px-3 bg-[#f7fafc] border">Message by Operator</th><td className="py-2 px-3 border whitespace-pre-wrap">{form.operatorMessage || "—"}</td></tr>
                  <tr><th className="py-2 px-3 bg-[#f7fafc] border">Avatar URL</th><td className="py-2 px-3 border">{form.avatarUrl || "—"}</td></tr>
                  <tr>
                    <th className="py-2 px-3 bg-[#f7fafc] border align-top">Online Hours</th>
                    <td className="py-2 px-3 border">
                      <table className="w-full text-xs">
                        <tbody>
                          {Object.entries(form.hours).map(([day, val]) => (
                            <tr key={day}>
                              <td className="capitalize py-1 pr-3">{day}</td>
                              <td className="py-1">{val.from || "—"}</td>
                              <td className="py-1">to</td>
                              <td className="py-1">{val.to || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}