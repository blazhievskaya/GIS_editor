from flask import Flask, request, send_from_directory,redirect, url_for, render_template
import codecs, os, pprint
from xml.dom.minidom import parse, parseString
from werkzeug import secure_filename

UPLOAD_FOLDER = '/Users/blazhievskaya_aleksandra/Documents/coursework/site/data'
ALLOWED_EXTENSIONS = set(['txt', 'csv','kml'])

app = Flask(__name__, static_url_path='')
app.config['/Users/blazhievskaya_aleksandra/Documents/coursework/site/data'] = UPLOAD_FOLDER

# set the project root directory as the static folder, you can set others.
app.debug = True

@app.route('/')
def export():
    return redirect('/export.html')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['/Users/blazhievskaya_aleksandra/Documents/coursework/site/data'], filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))
    
@app.route('/Users/blazhievskaya_aleksandra/Documents/coursework/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['/Users/blazhievskaya_aleksandra/Documents/coursework/site/data'],
                               filename)
    
@app.route('/csv/<path:path>')
def send_js(path):
    return send_from_directory('csv', path)

@app.route('/site/<path:path>')
def send_public(path):
    return send_from_directory('site', path)

#@app.route('/uploadCsv')
#def upload_csv():
#    return true

   
@app.route('/convert')
def convert():
    csv = kmlToCsv(u'site/data/test.kml');
    return redirect('/site/result.html')

def getText(nodelist):
    rc = []
    for node in nodelist:
        if node.nodeType == node.TEXT_NODE:
            rc.append(node.data)
        if node.nodeType == node.CDATA_SECTION_NODE:
            rc.append(node.data)
    return ''.join(rc).strip(' \t\n\r')

placeMarks = {};

def languageProcessing(headers, rows, family, languageNode):
    familyName = family.getElementsByTagName("name")[0]
    languageName = languageNode.getElementsByTagName("name")[0];
    placeMarkNodes = languageNode.getElementsByTagName("Placemark")
    
    for placeMarkNode in placeMarkNodes:
        if placeMarkNode in placeMarks:
            continue
        placeMarkName = placeMarkNode.getElementsByTagName("name")[0]
        if getText(placeMarkName.childNodes) == 'Kurdul':
            pprint.pprint(family)  
            pprint.pprint(languageNode)         
        
        row = {
            'family': getText(familyName.childNodes),
            'language': getText(languageName.childNodes),
            'placemark' : getText(placeMarkName.childNodes)
        };
        
        lookAt = placeMarkNode.getElementsByTagName("LookAt")
        description = placeMarkNode.getElementsByTagName("description")
        point = placeMarkNode.getElementsByTagName("Point")
        
        if lookAt and lookAt[0].hasChildNodes():
            lookAt = lookAt[0].childNodes;
            for node in lookAt:
                headerName = node.nodeName
                if not headerName in headers:
                    headers[headerName] = 1
                row[headerName] = getText(node.childNodes)
        if point and point[0].hasChildNodes():
            point = point[0].childNodes;
            for node in point:
                headerName = node.nodeName
                if headerName=='coordinates':
                    coordinates = getText(node.childNodes)
                    coordinates = coordinates.split(',')
                    lng = coordinates[0]
                    lat = coordinates[1]
                    headers['lng'] = 1
                    headers['lat'] = 1
                    row['lng'] = lng
                    row['lat'] = lat
        if description:
            description = description[0]
            description = getText(description.childNodes)
            headers['description'] = 1
            row['description'] = description
        rows.append(row)
        placeMarks[placeMarkNode] = 1

def familyProcessing(headers, rows, family):
    languageNodes = family.getElementsByTagName("Folder")
    if languageNodes:
        for languageNode in languageNodes:
            languageProcessing(headers, rows, family, languageNode)
    else:
        languageProcessing(headers, rows, family, family)
 

def kmlToCsv(kml):
    csv = u'test.csv'  

    headers = {'family':1,'language':1,'placemark':1}
    familyNames = {}

    

    rows = [];
    dom = parse(kml)

    folderGlobal = dom.getElementsByTagName("Folder")
    if folderGlobal:
        folderGlobal = folderGlobal[0]
        families = folderGlobal.getElementsByTagName("Folder")
            
        #все языки одной семьи
        if families:
            for family in families:
                familyProcessing(headers, rows, family)
        else:
            familyProcessing(headers, rows, folderGlobal)
    else:
        familyProcessing(headers, rows, dom)
        
    i = 0;
    f1 = codecs.open(csv, 'w','utf-8')
    for header in headers:
        if i+1 < len(headers):
            f1.write(header + u';')
        else:
            f1.write(header)
        i+=1
    f1.write(u'\r\n');
    for row in rows:
        i = 0;
        for header in headers:
            value = row.get(header,'');
            if i+1 < len(headers):
                f1.write(value+ u';')
            else:
                f1.write(value)
            i+=1
        f1.write(u'\r\n');
         
    f1.close()
    return csv;


if __name__ == "__main__":
    app.run(host='localhost', port=5001)
     
