import React, {useState} from "react";
import { CheckCircle,AlertCircle,Shield,Download } from "lucide-react";

export default function MetaMaskGuide(){



    const steps =[
        {
            id:'install',
            title:'Install MetaMask',
            icon:Download,
            content:(
                <>
                <h3>Step 1: Install MetaMask</h3>
                <div>
                    <div>
                        <h4>
                            For Desktop (Browser Extension): </h4>
                            <ol>
                                <li>Visit the offical Website at<span>metmask.io</span></li>
                                <li>Click "Download" and select browser</li>
                                <li>Click "Install MetaMask" for your browser</li>
                                <li>Add the extension to your browser's store</li>
                                <li>Pin the extension to your toolbar</li>
                            </ol>
                    </div>
                    <div>
                        <h4>For Mobile :</h4>
                        <ol>
                            <li>Open Apple App Store or Google Play Store</li>
                            <li>Search for "MetaMask"</li>
                            <li>Download Officail MetaMask App</li>
                            <li>Open the App after Installation</li>
                        </ol>
                    </div>
                    <div>
                        <div>
                            <AlertCircle />
                            <p><strong>Important:</strong>Only download from offical sources to avoid fake app or phishing attemps</p>
                        </div>
                    </div>
                </div>
                </>
            )
        },
        {
            
        }
    ]
}