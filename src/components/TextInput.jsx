const TextInput = ({ type = "text", placeholder, icon: Icon, label, ...props }) => {
    return (
        <div className="relative mb-4">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="relative">
                {Icon && <Icon className="w-5 h-5 text-gray-300 absolute top-1/2 left-3 transform -translate-y-1/2" />}
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full pl-10 p-[14px] border text-secondary text-sm border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    {...props}
                />
            </div>
        </div>
    );
};

export default TextInput;
