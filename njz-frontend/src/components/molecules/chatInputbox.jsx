import Button from '../atoms/buttons';
import InputField from '../atoms/inputfeild';
import React, { useRef } from 'react';
import { Upload, Send, FileText } from 'lucide-react';
import Icon from '../atoms/icons';
import Tag from '../atoms/tag';

const ChatInputBox = ({
  message,
  setMessage,
  onSend,
  onFileUpload,
  files = [],
  onFileRemove,
  disabled = false
}) => {
  const fileInputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !disabled) {
        onSend();
      }
    }
  };

  return (
    <div className="border-t border-[#23232b] bg-[#18181b] p-4">
      <label className="block text-xs text-[#a1a1aa] mb-1 uppercase tracking-wider">
        Type your message
      </label>

      {/* Uploaded Files Appear Above Input */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {files.map((file, idx) => (
            <Tag
              key={file.name + idx}
              onRemove={() => onFileRemove(idx)}
              className="bg-[#23232b] border border-cyan-300 text-cyan-300"
            >
              <Icon icon={FileText} size="sm" className="mr-1" />
              {file.name}
            </Tag>
          ))}
        </div>
      )}

      <div className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <InputField
            multiline
            rows={2}
            placeholder="Ask a question about your documents..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="bg-[#23232b] text-[#e5e7eb] border-[#23232b] focus:ring-[#6366f1] focus:border-[#6366f1] placeholder:text-[#a1a1aa]"
          />
        </div>
        <div className="flex space-x-2 mb-5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}

            className="hover:bg-[#23232b]"
          >
            <Icon icon={Upload} />
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onSend}
            disabled={!message.trim() || disabled}
            className="bg-[#6366f1] text-white hover:bg-[#4f46e5] font-semibold border border-[#6366f1]"
          >
            <Icon icon={Send} />
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.docx"
        onChange={(e) => onFileUpload(Array.from(e.target.files))}
        className="hidden"
      />
    </div>
  );
};

export default ChatInputBox;
