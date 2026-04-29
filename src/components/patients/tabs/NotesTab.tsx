import Card from '../../common/Card';
import Button from '../../common/Button';

export default function NotesTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Create New Note">
        <select className="w-full border border-gray-200 rounded-xl p-3 mb-4">
          <option>Clinical Note</option>
          <option>Medication Review</option>
          <option>Patient Update</option>
        </select>
        <textarea 
          className="w-full h-48 border border-gray-200 rounded-2xl p-4 resize-y" 
          placeholder="Enter note details..."
        />
        <Button className="mt-4 w-full">Save Note</Button>
      </Card>

      <Card title="Notes History">
        <div className="space-y-4">
          <div className="p-4 border rounded-2xl">
            <p className="font-medium">Medication adjusted after BP spike</p>
            <p className="text-xs text-gray-500 mt-1">2026-04-28 • Dr. Sarah Ahmed</p>
          </div>
          <div className="p-4 border rounded-2xl">
            <p className="font-medium">Patient reported dizziness after reading</p>
            <p className="text-xs text-gray-500 mt-1">2026-04-27 • Nurse Ayesha</p>
          </div>
        </div>
      </Card>
    </div>
  );
}